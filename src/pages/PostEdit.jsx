import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "./PostNew.module.css";

function PostEdit({ posts, onUpdate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { id } = useParams();
  const post = posts.find((p) => String(p.id) === id);
  const navigate = useNavigate();

  useEffect(() => {
    if (!post) return;
    // enlist-disable-next-line
    setTitle(post.title);
    setContent(post.content);
  }, [post]);

  if (!post) {
    return (
      <p>
        <h2>404에러</h2>
        <p>존재하지 않는 게시물입니다.</p>
        <Link to="/">홈으로 이동</Link>
        <Link to="/posts">글 목록으로 이동</Link>
      </p>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle || !trimmedContent) {
      alert("제목과 내용을 모두 입력해주세요");
      return;
    }
    onUpdate(Number(id), { title: trimmedTitle, content: trimmedContent });
    navigate(`/post/${id}`);
  };

  return (
    <>
      <h2>글 작성</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
        <button>등록</button>
      </form>
    </>
  );
}

export default PostEdit;
