import CommentContainer from "./comment-container";
import CommentContent from "./comment-content";
import CommentHeader from "./comment-header";

interface CommentProps {
  author: User
  comment: CommentSuccessResponse['comment'],
  user: User
}

export default function Comment({ author, comment }:CommentProps) {

  return (
    <CommentContainer>
      <CommentHeader author={author} comment={comment} />
      <CommentContent comment={comment} />
    </CommentContainer>
  )
}
