'use client';
import React, { useEffect, useState } from 'react';
import { db, readFirebaseCollection } from '../firebase';
import { AnimatePresence, motion } from 'framer-motion';
import CouponGenerator from '@/components/services/coupon-generator';
import CouponAssignment from '@/components/admin/agent/coupon-codes';
import Image from 'next/image';
import { doc, setDoc } from 'firebase/firestore';
import { Button } from '@material-tailwind/react';

export default function EditAgents({ setShowSection }) {
  const [agents, setAgents] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showAgent, setShowAgent] = useState(false);
  const [activeState, setActiveState] = useState(selectedAgent?.active);

  const getAllUsers = async () => {
    try {
      const response = await readFirebaseCollection("users");
      const agents = response.filter(user => user.userRole === 'agent');
      setAgents(agents);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleShowAgent = (agent) => {
    setSelectedAgent(agent);
    setShowAgent(true);
  };

  const toggleActive = async (active) => {
    let agent = {
      ...selectedAgent,
      active: active,
    };
    setSelectedAgent(agent);
    await setDoc(doc(db, "users", selectedAgent?.uid), agent);
  };

  const updateAgent = async () => {
    await setDoc(doc(db, "users", selectedAgent?.uid), selectedAgent);
  };

  useEffect(() => {
    if (showAgent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showAgent]);

  useEffect(() => {
    getAllUsers();
    
  }, [showAgent]);

  return (
    <div className='pb-[150px] mt-[100px] flex h-full'>
      <div className='container mx-auto px-[5%] lg:px-0 pt-[20px]'>
        <div onClick={() => setShowSection('home')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 hover:cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0L9 3m-6 6h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
        </div>
        <p className='font-[700] text-[28px] mt-[25px]'>Travel Agents</p>

        {agents == null && (
          <div className='h-[full] w-[full] text-[22px] font-[600] flex justify-center items-center pt-[30vh]'>
            Loading
          </div>
        )}

        {agents != null && (
          <>
            {/* Table for Inactive Agents */}
            <div className='mt-5'>
              <p className='text-[20px] font-[600]'>Waiting for Approval</p>
              <div className='overflow-auto mt-[30px]'>
                <table className='min-w-full bg-white border'>
                  <thead>
                    <tr className='w-full bg-gray-100 border-b'>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500'>
                        Agent Name
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500'>
                        Email
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500'>
                        Contact
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500'>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {agents.filter(agent => agent.active === false).length > 0 ? (
                      agents
                        .filter(agent => agent.active === false)
                        .map((agent, index) => (
                          <tr key={index} className='border-b'>
                            <td className='px-6 py-4'>{agent.displayName}</td>
                            <td className='px-6 py-4'>{agent.email}</td>
                            <td className='px-6 py-4'>{agent.contact}</td>
                            <td className='px-6 py-4'>
                              <Button
                                className='bg-blue-500 text-white'
                                onClick={() => handleShowAgent(agent)}
                              >
                                View Details
                              </Button>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan='4' className='text-center py-4'>
                          No inactive agents found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table for Active Agents */}
            <div className='mt-8'>
              <p className='text-[20px] font-[600]'>Active Agents</p>
              <div className='overflow-auto mt-[30px]'>
                <table className='min-w-full bg-white border'>
                  <thead>
                    <tr className='w-full bg-gray-100 border-b'>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500'>
                        Agent Name
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500'>
                        Email
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500'>
                        Contact
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500'>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {agents
                      .filter(agent => agent.active === true)
                      .map((agent, index) => (
                        <tr key={index} className='border-b'>
                          <td className='px-6 py-4'>{agent.displayName}</td>
                          <td className='px-6 py-4'>{agent.email}</td>
                          <td className='px-6 py-4'>{agent.contact}</td>
                          <td className='px-6 py-4'>
                            <Button
                              className='bg-blue-500 text-white'
                              onClick={() => handleShowAgent(agent)}
                            >
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {showAgent && (
          <motion.div
            className='fixed top-0 left-0 h-[100vh] w-[100vw] bg-black bg-opacity-50 z-10 flex justify-center items-center p-[5%]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className='w-[70%] h-[90vh] bg-white rounded-[15px] overflow-y-scroll'
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{
                type: 'tween',
                stiffness: 200,
                damping: 20,
                ease: 'easeInOut',
              }}
            >
              <div className='h-[77px] bg-secondary w-full flex items-center justify-between px-[20px] text-[40px]'>
                <p className='pl-[50px]'>{selectedAgent?.displayName}</p>
                <motion.div
                  className='bg-custom-red p-[5px] cursor-pointer h-[40px] w-[40px] text-white font-[400] flex justify-center items-center rounded-[10px] text-[25px]'
                  onClick={() => setShowAgent(false)}
                  whileTap={{ scale: 0.9 }}
                >
                  X
                </motion.div>
              </div>
              <div className='px-[70px] py-[25px]'>
                <div className='flex justify-between mb-[40px]'>
                  <div className='flex flex-col gap-2'>
                    <div className='flex gap-5 items-center'>
                      {selectedAgent?.photoURL && (
                        <Image
                          src={selectedAgent?.photoURL}
                          alt='profile'
                          height={800}
                          width={800}
                          className='h-[150px] w-[150px] rounded-full border-[10px] border-white'
                        />
                      )}

                      <div>
                        <p>Agent Id: {selectedAgent?.uid}</p>
                        <p>Agent Name: {selectedAgent?.displayName}</p>
                        <p>Company Name: {selectedAgent?.company}</p>
                        <p>Email: {selectedAgent?.email}</p>
                      </div>
                      <div className='flex flex-col items-end w-full gap-2'>
                        <Button
                          className={`bg-${selectedAgent?.active ? 'red' : 'green'}-500 text-white`}
                          onClick={() => {
                            toggleActive(!selectedAgent?.active);
                            setActiveState(!selectedAgent?.active);
                          }}
                        >
                          {selectedAgent?.active ? 'Deactivate' : 'Activate'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Coupon Assignment Section */}
                <CouponAssignment
                  assignedCoupons={selectedAgent?.coupons || []}
                  onChange={(updatedCoupons) => {
                    setSelectedAgent({
                      ...selectedAgent,
                      coupons: updatedCoupons,
                    });
                  }}
                />

                <div className='flex justify-center mt-5'>
                  <Button
                    className='bg-blue-500 text-white'
                    onClick={updateAgent}
                  >
                    Update
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
