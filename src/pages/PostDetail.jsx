import { useParams, Link, useNavigate } from "react-router";

function PostDetail({ posts, onDelete }) {
  const { id } = useParams();
  const post = posts.find((p) => String(p.id) === id);
  const navigate = useNavigate();

  if (!post) {
    return (
      <>
        <h2>404에러</h2>
        <p>존재하지 않는 게시물입니다.</p>
        <Link to="/">홈으로 이동</Link>
        <Link to="/posts">글 목록으로 이동</Link>
      </>
    );
  }

  const handleDelete = () => {
    if (window.confirm("정말 삭제할까요?")) {
      onDelete(post.id);
      navigate("/posts");
    }
  };

  return (
    <>
      <h2>{post.title}</h2>
      <small>{post.createdAt}</small>
      <p>{post.content}</p>
      <div className="controls">
        <Link to={`/post/${post.id}/edit`}>수정하기</Link>
        <button onClick={handleDelete}>삭제하기</button>
      </div>
    </>
  );
}

export default PostDetail;
