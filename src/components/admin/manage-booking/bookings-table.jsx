import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { blue } from "@mui/material/colors";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Confirmed",
    value: "confirmed",
  },
  {
    label: "Ongoing",
    value: "ongoing",
  },
  {
    label: "Completed",
    value: "completed",
  },
  {
    label: "Rejected",
    value: "rejected",
  },
];

const TABLE_HEAD = ["User", "Service", "Status", "Price", "Action"];

const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@creative-tim.com",
    job: "Manager",
    org: "Organization",
    online: true,
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    job: "Programator",
    org: "Developer",
    online: false,
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    job: "Executive",
    org: "Projects",
    online: false,
    date: "19/09/17",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: "Michael Levi",
    email: "michael@creative-tim.com",
    job: "Programator",
    org: "Developer",
    online: true,
    date: "24/12/08",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: "Richard Gran",
    email: "richard@creative-tim.com",
    job: "Manager",
    org: "Executive",
    online: false,
    date: "04/10/21",
  },
];

export function BookingTable({ bookings }) {
  function formatDateFromTimestamp({ seconds, nanoseconds }) {
    // Convert the seconds to milliseconds
    const date = new Date(seconds * 1000);
    // Extract date components
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const year = date.getFullYear();

    // Format the date
    const formattedDate = `${month}/${day}/${year}`;

    return formattedDate;
  }
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Booking list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all bookings
            </Typography>
          </div>
          {/* <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              view all
            </Button>
            <Button className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
            </Button>
          </div> */}
        </div>
        {/* <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div> */}
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bookings.map(
              ({ id, photo, displayName, email, type, transfer, name, date, contact, noOfPassengers, status, includeGuide, guideLanguage, additionalTickets, travelDetails }, index) => {
                const isLast = index === bookings.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={photo} alt={displayName} size="sm" />
                        <div className="flex flex-col">
                          {/* <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {id}
                          </Typography> */}
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {displayName}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {email}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {contact}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col max-w-[200px]">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {type || transfer}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {name}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          Date: {date && formatDateFromTimestamp(date)}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          Guests: {noOfPassengers}
                        </Typography>
                        {includeGuide &&
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            Guide: {guideLanguage}
                          </Typography>
                        }
                        {Array.isArray(additionalTickets) && additionalTickets.length > 0 &&
                          <div className="flex flex-col p-[3px] bg-blue-gray-100 rounded-[10px]">
                            <p>Additional Tickets:</p>
                            <div className="pl-2">
                              {additionalTickets.map((ticket, id) => (
                                <Typography
                                  key={id}
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {ticket.name}
                                </Typography>
                              ))}
                            </div>
                          </div>
                        }
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={status}
                        // value={online ? "online" : "offline"}
                        // color={online ? "green" : "blue-gray"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        Price
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={"View"}
                        className="mt-1 bg-green-500"
                        // value={online ? "online" : "offline"}
                        // color={green}
                      />
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={"Edit"}
                        className="mt-1 bg-blue-400"
                        // value={online ? "online" : "offline"}
                        // color={blue}
                      />
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={"Delete"}
                        className="mt-1 bg-red-500"
                        // value={online ? "online" : "offline"}
                        // color={red}
                      />
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}