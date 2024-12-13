import type { Author } from "../types"

const AuthorCard: React.FC<{ author: Author }> = ({ author }) => {
  return <b>{author.fullName ?? author.name}</b>
}

export default AuthorCard
