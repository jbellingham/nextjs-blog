import { format } from "date-fns";
import { parseISO } from "date-fns";

export default function Date({ dateString }): React.PureComponent {
    const date = parseISO(dateString);
    return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
}
