type Props = {
  testid?: string;
  link: string;
  text: string;
};

const Link = ({ link, text }: Props) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  );
};

export default Link;
