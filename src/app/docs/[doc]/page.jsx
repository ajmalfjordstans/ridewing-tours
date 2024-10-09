'use client'
import React, { useEffect, useState } from 'react';
import TermsAndConditions from './termsandconditions';
import RefundPolicy from './refundpolicy';
import CookiePolicy from './cookiepolicy';
import CancellationPolicy from './cancellationpolicy';
import TermsOfUse from './termsofuse';


const Page = ({ params }) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    if (params.doc) {
      setData(params.doc); 
    }
  }, [params.doc])

  let ComponentToRender;

  switch (data) {
    case 'termsandconditions':
      ComponentToRender = TermsAndConditions;
      break;
    case 'refundpolicy':
      ComponentToRender = RefundPolicy;
      break;
    case 'cookiepolicy':
      ComponentToRender = CookiePolicy;
      break;
    case 'cancellationpolicy':
      ComponentToRender = CancellationPolicy;
      break;
    case 'termsofuse':
      ComponentToRender = TermsOfUse;
      break;
    default:
      ComponentToRender = () => <div>Page Not Found</div>;
      break;
  }

  if (!data) return <p>Loading...</p>;

  return (
    <div className="px-4 md:px-8 lg:px-16 py-8 max-w-6xl mx-auto mt-[110px]">
      <ComponentToRender />
    </div>
  );
};

export default Page;