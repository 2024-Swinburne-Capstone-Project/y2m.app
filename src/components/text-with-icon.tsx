import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TextWithIcon({
  text,
  icon,
}: {
  text: string;
  icon: IconProp;
}) {
  return (
    <div className="flex items-center gap-2 mt-4">
      <FontAwesomeIcon icon={icon} />
      <p>{text}</p>
    </div>
  );
}
