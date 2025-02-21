import Link from "next/link";
import CommentContainer from "./comment-container";
import CommentContent from "./comment-content";
import CommentFooter from "./comment-footer";
import CommentHeader from "./comment-header";

interface CommentProps {
  author: User
  comment: CommentSuccessResponse['comment'],
  user: User
}

export default function Comment({ author, comment, user }:CommentProps) {

  return (
    <CommentContainer>
      <CommentHeader author={author} comment={comment} />
      <Link href={`/reply/${comment.id_string}`}>
        <CommentContent comment={comment} />
      </Link>
      <CommentFooter comment={comment} user={user} />
    </CommentContainer>
  )
}
