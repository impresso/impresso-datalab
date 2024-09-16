export interface Author {
  slug: string
  name: string
  fullName?: string
}

const AuthorCard: React.FC<{ author: Author }> = ({ author }) => {
  return <b>{author.fullName ?? author.name}</b>
}

export default AuthorCard
