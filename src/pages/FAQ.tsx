import React from 'react';

export function FAQ() {
    return (
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-8 max-w-2xl mx-auto">
            <header className="text-center mb-8">
                <a href="http://www.ycombinator.com">
                    {/*<img src="/public/logo.png" alt="Y Combinator Logo" className="mx-auto mb-4 w-full max-w-xs" />*/}
                </a>
                <h1 className="text-3xl font-bold">Hacker News FAQ</h1>
            </header>

            <section className="space-y-8">
                <div>
                    <h2 className="text-xl font-semibold">Are there rules about submissions and comments?</h2>
                    <p>
                        <a href="newsguidelines.html" className="text-blue-500 hover:underline">
                            https://news.ycombinator.com/newsguidelines.html
                        </a>
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold">How are stories ranked?</h2>
                    <p className="text-gray-700 dark:text-gray-300">
                        The basic algorithm divides points by a power of the time since a story was submitted. Comments in threads
                        are ranked the same way. Other factors affecting rank include user flags, anti-abuse software, software
                        which demotes overheated discussions, account or site weighting, and moderator action.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold">How is a user's karma calculated?</h2>
                    <p className="text-gray-700 dark:text-gray-300">
                        Roughly, the number of upvotes on their posts minus the number of downvotes. Some votes are dropped by
                        anti-abuse software.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold">Do posts by users with more karma rank higher?</h2>
                    <p className="text-gray-700 dark:text-gray-300">No.</p>
                </div>

                {/* Additional FAQ items here, structured similarly */}

                <div>
                    <h2 className="text-xl font-semibold">Why are some comments faded?</h2>
                    <p className="text-gray-700 dark:text-gray-300">
                        Faded text means that a comment has been downvoted. You can read the comment in normal text by clicking on
                        its timestamp to go to its page.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold" id="flag">What does [flagged] mean?</h2>
                    <p className="text-gray-700 dark:text-gray-300">
                        Users flagged the post as breaking the{" "}
                        <a href="newsguidelines.html" className="text-blue-500 hover:underline">
                            guidelines
                        </a>{" "}
                        or otherwise not belonging on HN. Moderators sometimes also add [flagged], and sometimes turn flags off when
                        they are unfair.
                    </p>
                </div>
            </section>
        </div>
    );
}