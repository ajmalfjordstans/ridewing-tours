import React from 'react';

const CookiePolicy = () => {
  const cookiePolicy = {
    title: "Ridewing Cookie Policy",
    introduction: "At Ridewing, we use cookies and similar technologies to enhance your online experience and to offer personalized services. This policy explains what cookies are, how we use them, and how you can manage your cookie preferences on our website.",
    sections: [
      {
        title: "1. What Are Cookies?",
        content: "Cookies are small data files stored on your device (such as your computer, tablet, or smartphone) when you visit a website. They serve various functions, like improving site performance, storing user preferences, and helping websites recognize you on future visits."
      },
      {
        title: "2. How We Use Cookies",
        content: "At Ridewing, we utilize cookies to improve your interaction with our website, customize content based on your preferences, and provide you with relevant offers and services. Cookies help us store information like your language choices, previously viewed services, and more, to streamline your experience."
      },
      {
        title: "3. Types of Cookies We Use",
        content: {
          necessaryCookies: "Necessary Cookies: These cookies are essential for the proper operation of our website. They allow you to navigate the site, use its features, and access secure areas. Without these cookies, some parts of our website won’t function properly.",
          performanceCookies: "Performance and Analytics Cookies: These cookies collect anonymous data on how users interact with our website. They provide insights into areas like page load times, user behavior, and error reporting, enabling us to continually enhance our website’s performance and user experience.",
          functionalityCookies: "Functionality Cookies: These cookies enable the website to remember choices you make, such as your language settings or login details. They improve your user experience by providing a more personalized and efficient service.",
          targetingCookies: "Targeting and Advertising Cookies: These cookies are used to deliver content and advertisements relevant to you. They also help measure the effectiveness of our marketing campaigns and limit how often you see specific ads. We may share this information with third-party advertising partners."
        }
      },
      {
        title: "4. Managing Cookies",
        content: "You have control over how cookies are used. Most web browsers allow you to accept, reject, or delete cookies through your browser settings. You can also configure your browser to notify you before cookies are placed, giving you the option to accept or reject them. Please be aware that disabling certain cookies may affect your experience on our website, as some functions and services may not work properly without them."
      },
      {
        title: "Contact Information",
        content: "By using our website, you agree to our use of cookies as outlined in this policy. If you have any questions about our Cookie Policy or how we handle cookies, please reach out to our support team."
      }
    ]
  };

  return (
    <div className="px-4 py-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{cookiePolicy.title}</h1>
      <p className="mb-6 text-lg">{cookiePolicy.introduction}</p>
      {cookiePolicy.sections.map((section, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">{section.title}</h2>
          {typeof section.content === 'object' ? (
            <>
              {section.content.necessaryCookies && (
                <p className="mb-2 font-semibold">{section.content.necessaryCookies}</p>
              )}
              {section.content.performanceCookies && (
                <p className="mb-2 font-semibold">{section.content.performanceCookies}</p>
              )}
              {section.content.functionalityCookies && (
                <p className="mb-2 font-semibold">{section.content.functionalityCookies}</p>
              )}
              {section.content.targetingCookies && (
                <p className="mb-2 font-semibold">{section.content.targetingCookies}</p>
              )}
            </>
          ) : (
            <p className="mb-2">{section.content}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default CookiePolicy;
