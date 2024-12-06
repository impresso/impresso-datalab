export type CorpusAccessProps = {
  className?: string
}

const CorpusAccess: React.FC<CorpusAccessProps> = ({ className = "" }) => {
  return <div className={`CorpusAccess ${className}`}>test</div>
}

export default CorpusAccess
