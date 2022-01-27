import { useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import { getPost } from '~/post';

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.slug) return null;
  return getPost(params.slug);
};

export default function PostSlug() {
  const post = useLoaderData();
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  );
}
