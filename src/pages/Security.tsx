import React from 'react';

export function Security() {
    return (
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen p-8 flex flex-col items-center">
            <div className="w-full max-w-2xl bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <header className="text-center mb-8">
                    <a href="http://www.ycombinator.com">
                        {/*<img src="yc500.gif" alt="Y Combinator Logo" className="mx-auto mb-4 max-w-full" />*/}
                    </a>
                    <h1 className="text-2xl font-bold">Hacker News Security</h1>
                </header>

                <section className="space-y-8 text-gray-700 dark:text-gray-300">
                    <p>
                        If you find a security hole, please let us know at{' '}
                        <a href="mailto:security@ycombinator.com" className="text-blue-500 hover:underline">
                            security@ycombinator.com
                        </a>. We try to respond with fixes as soon as possible and truly appreciate the help.
                    </p>

                    <p>
                        Thanks to the following people who have discovered and responsibly disclosed security holes in Hacker News:
                    </p>

                    <div className="space-y-6">
                        {/* Repeatable Disclosure Items */}
                        <div>
                            <h3 className="text-lg font-semibold">
                                2023-01-02: <a href="https://carter.sande.duodecima.technology/" className="text-blue-500 hover:underline">Carter Sande</a>,{' '}
                                <a href="http://www.slatersf.com" className="text-blue-500 hover:underline">Mark Slater</a>,{' '}
                                <a href="https://james.darpinian.com/" className="text-blue-500 hover:underline">James Darpinian</a>
                            </h3>
                            <ul className="list-disc list-inside ml-6">
                                <li>Submission titles were no longer being HTML-escaped in some places.</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold">
                                2022-09-04: Dimitris Triantafyllidis
                            </h3>
                            <ul className="list-disc list-inside ml-6">
                                <li>User karma could be increased by exploiting an upvote/unvote bug.</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold">
                                2021-07-04: <a href="https://twitter.com/ryotkak" className="text-blue-500 hover:underline">RyotaK</a>
                            </h3>
                            <ul className="list-disc list-inside ml-6">
                                <li>URL tricks could display the wrong domain for some websites.</li>
                            </ul>
                        </div>

                        {/* Add more disclosures as needed following the same structure */}
                    </div>

                    <p>
                        <b>Missing From This List?</b> If you reported a vulnerability to us and don't see your name, please shoot us an email, and we'll happily add you.
                    </p>
                </section>
            </div>
        </div>
    );
}