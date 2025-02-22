import { Text } from '@chakra-ui/react';

export function TimeText({ children, ...rest }) {
  const date = new Date(children);
  const formattedDate = date.toLocaleString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).replace(",", "");

  return (
    <Text {...rest}>{formattedDate}</Text>
  )
}