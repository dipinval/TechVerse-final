import Post from '../post/Post'
import './posts.css'

export default function Posts({ posts }) {
  if (!Array.isArray(posts)) {
    console.error('Error: Posts should be an array');
    return null; // or some fallback UI if needed
  }

  return (
    <div className="posts">
      {posts.map((p) => (
        <Post key={p.id} post={p} />
      ))}
    </div>
  );
}
