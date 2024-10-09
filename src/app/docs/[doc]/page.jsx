'use client';
import React, { useEffect, useState } from 'react';
import TermsAndConditions from './termsandconditions';
import RefundPolicy from './refundpolicy';
import CookiePolicy from './cookiepolicy';
import CancellationPolicy from './cancellationpolicy';
import TermsOfUse from './termsofuse';

const Page = ({ params }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (params?.doc) {
      setData(params.doc);
    }
  }, [params.doc]);

  const componentMap = {
    termsandconditions: TermsAndConditions,
    refundpolicy: RefundPolicy,
    cookiepolicy: CookiePolicy,
    cancellationpolicy: CancellationPolicy,
    termsofuse: TermsOfUse,
  };

  const ComponentToRender = componentMap[data] || (() => <div>Page Not Found</div>);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="px-4 md:px-8 lg:px-16 py-8 max-w-6xl mx-auto mt-[110px]">
      <ComponentToRender />
    </div>
  );
};

export default Page;
