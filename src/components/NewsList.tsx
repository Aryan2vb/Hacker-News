import React, { useEffect, useState } from 'react';
import { ChevronUp, MessageSquare, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Comments } from './Comments';
import { useNewsStore } from '../stores/newsStore';

interface Story {
  id: number;
  title: string;
  url: string;
  by: string;
  score: number;
  descendants: number;
  time: number;
  kids?: number[];
}

interface NewsListProps {
  type: 'top' | 'best' | 'ask' | 'show' | 'job';
}

export function NewsList({ type }: NewsListProps) {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedStory, setExpandedStory] = useState<number | null>(null);
  const { searchQuery, currentPage, itemsPerPage, setCurrentPage } = useNewsStore();

  useEffect(() => {
    async function fetchStories() {
      try {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/${type}stories.json`);
        const storyIds = await response.json();

        // Helper function to fetch stories in slices of 10
        const fetchSlice = async (sliceStart: number) => {
          const sliceStories = await Promise.all(
              storyIds.slice(sliceStart, sliceStart + 1).map(async (id: number) => {
                const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
                return response.json();
              })
          );
          setStories((prevStories) => [...prevStories, ...sliceStories.filter(Boolean)]);
        };

        // Fetch the first 10 stories initially
        await fetchSlice(0);
        setLoading(false);

        // Continue fetching the remaining slices in the background
        for (let i = 10; i < storyIds.length; i += 10) {
          await fetchSlice(i);
        }
      } catch (error) {
        console.error('Error fetching stories:', error);
        setLoading(false);
      }
    }

    fetchStories();
  }, [type]);

  const filteredStories = stories.filter((story) => {
    if (!searchQuery) return true;
    const searchLower = searchQuery.toLowerCase();
    return (
        story.title?.toLowerCase().includes(searchLower) ||
        story.by?.toLowerCase().includes(searchLower) ||
        story.url?.toLowerCase().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(filteredStories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStories = filteredStories.slice(startIndex, startIndex + itemsPerPage);

  const toggleComments = (storyId: number) => {
    setExpandedStory(expandedStory === storyId ? null : storyId);
  };

  if (loading) {
    return (
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
    );
  }

  return (
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
            <tr className="text-left text-sm text-gray-900 dark:text-gray-300">
              <th className="pb-4 font-medium">Title</th>
              <th className="pb-4 font-medium">Source</th>
              <th className="pb-4 font-medium">Posted by</th>
              <th className="pb-4 font-medium text-right">Points</th>
              <th className="pb-4 font-medium text-right">Comments</th>
              <th className="pb-4 font-medium text-right">Time</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedStories.map((story, index) => (
                <React.Fragment key={story.id}>
                  <tr className="group">
                    <td className="py-4 pr-8">
                      <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-900 dark:text-gray-300">
                        {startIndex + index + 1}.
                      </span>
                        <a
                            href={story.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-900 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400"
                        >
                          {story.title}
                        </a>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-gray-900 dark:text-gray-300">
                      {story.url ? new URL(story.url).hostname : 'news.ycombinator.com'}
                    </td>
                    <td className="py-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{story.by}</span>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <ChevronUp className="h-4 w-4 text-orange-500" />
                        <span className="text-sm text-gray-900 dark:text-gray-300">{story.score}</span>
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      <button
                          onClick={() => toggleComments(story.id)}
                          className="flex items-center justify-end gap-1 hover:text-orange-500"
                      >
                        <MessageSquare className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-900 dark:text-gray-100">
                        {story.descendants || 0}
                      </span>
                      </button>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Clock className="h-4 w-4 text-gray-900 dark:text-gray-300" />
                        <span className="text-sm text-gray-900 dark:text-gray-300">
                        {formatDistanceToNow(story.time * 1000, { addSuffix: true })}
                      </span>
                      </div>
                    </td>
                  </tr>
                  {expandedStory === story.id && story.kids && (
                      <tr>
                        <td colSpan={6} className="py-4">
                          <Comments commentIds={story.kids} />
                        </td>
                      </tr>
                  )}
                </React.Fragment>
            ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center gap-2">
          <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 text-sm rounded-lg ${
                      currentPage === page
                          ? 'bg-orange-500 text-white'
                          : 'text-gray-900 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400'
                  }`}
              >
                {page}
              </button>
          ))}
          <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
  );
}