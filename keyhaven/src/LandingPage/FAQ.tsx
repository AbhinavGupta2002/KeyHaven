import React from "react";

export const FAQ = () => {
    const list:Array<any> = [
        {
            title: `What is KeyHaven?`,
            body: `KeyHaven is an online password managing platform website that allows you to securely store and manage your passwords in one place.`
        },
        {
            title: `What happens if I forget my master password?`,
            body: `If you forget your master password, KeyHaven has a password recovery process in place to assist you in regaining access to your account.`
        },
        {
            title: `How does KeyHaven store my passwords?`,
            body: `KeyHaven uses several security methods to ensure that your passwords are stored safely and securely. Only you have access to your personal passwords through the use of your master password.`
        },
        {
            title: `How much does it cost for me to use KeyHaven?`,
            body: `It costs you NOTHING! Absoutely free - no strings attached. It is a non-profit project that I built to completion in order to depict my skills.`
        },
        {
            title: `Does KeyHaven offer a mobile app?`,
            body: `No, KeyHaven does not currently offer a mobile app as it is a non-profit project and the focus for me was to offer a highly secure and user-friendly website.`
        }
    ]
    return (
        <div
        className="bg-white border border-gray-200 divide-y divide-gray-200 rounded-xl"
        >
            {list.map(faq => 
                <details className="group p-6 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between cursor-pointer">
                    <h2 className="text-lg font-medium text-default1">
                        {faq.title}
                    </h2>

                    <span className="relative ml-1.5 h-5 w-5 flex-shrink-0">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0 w-5 h-5 opacity-100 group-open:opacity-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                        >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                        </svg>

                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0 w-5 h-5 opacity-0 group-open:opacity-100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                        >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                        </svg>
                    </span>
                    </summary>

                    <p className="mt-4 leading-relaxed text-gray-700">
                        {faq.body}
                    </p>
                </details>
            )}
        </div>
    )
}