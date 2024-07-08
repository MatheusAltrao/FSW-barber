interface SectionTitleProps {
  text: string;
}
const SectionTitle = ({ text }: SectionTitleProps) => {
  return <p className="uppercase text-gray-400 mb-3 font-bold text-xs">{text}</p>;
};

export default SectionTitle;
