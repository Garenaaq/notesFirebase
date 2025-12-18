import { EmptyState as EmptyStateChakra } from "@chakra-ui/react";
import type { FC } from "react";

interface EmptyStateProps {
  titleProps?: EmptyStateChakra.TitleProps;
  indicatorProps?: EmptyStateChakra.IndicatorProps;
}

export const EmptyState: FC<EmptyStateProps> = ({ titleProps, indicatorProps }) => {
  return (
    <EmptyStateChakra.Root>
      <EmptyStateChakra.Content>
        <EmptyStateChakra.Indicator {...indicatorProps} />
        <EmptyStateChakra.Title children="Данные отсутствуют" {...titleProps} />
      </EmptyStateChakra.Content>
    </EmptyStateChakra.Root>
  );
};
