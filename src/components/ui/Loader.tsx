import { Spinner, type SpinnerProps } from "@chakra-ui/react";
import type { FC } from "react";

export const Loader: FC<SpinnerProps> = (props) => {
  return <Spinner size="lg" {...props} />;
};
