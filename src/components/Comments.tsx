import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

interface Comment {
  id: number;
  by: string;
  text: string;
  time: number;
  kids?: number[];
}

interface CommentsProps {
  commentIds: number[];
  level?: number;
}

export function Comments({ commentIds, level = 0 }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [expandedComments, setExpandedComments] = useState<Record<number, boolean>>({});

  useEffect(() => {
    async function fetchComments() {
      try {
        const fetchedComments = await Promise.all(
          commentIds.map(async (id) => {
            const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            return response.json();
          })
        );
        setComments(fetchedComments.filter(Boolean));
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }

    fetchComments();
  }, [commentIds]);

  const toggleComment = (commentId: number) => {
    setExpandedComments(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  if (!comments.length) return null;

  return (
    <div className={`space-y-4 ${level > 0 ? 'ml-8' : ''}`}>
      {comments.map((comment) => (
        <div key={comment.id} className="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
          <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-gray-300 mb-2">
            <span>{comment.by}</span>
            <span>•</span>
            <span>{formatDistanceToNow(comment.time * 1000, { addSuffix: true })}</span>
          </div>
          <div 
            className="prose dark:prose-invert max-w-none text-gray-900 dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: comment.text || '' }}
          />
          {comment.kids && comment.kids.length > 0 && (
            <button
              onClick={() => toggleComment(comment.id)}
              className="text-sm text-orange-500 hover:text-orange-600 mt-2"
            >
              {expandedComments[comment.id] ? 'Hide replies' : `Show ${comment.kids.length} replies`}
            </button>
          )}
          {comment.kids && expandedComments[comment.id] && (
            <div className="mt-4 text-gray-900 dark:text-gray-300">
              <Comments commentIds={comment.kids} level={level + 1} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}