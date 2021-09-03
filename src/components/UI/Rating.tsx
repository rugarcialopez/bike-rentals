import React from "react";
import { Box } from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

const Rating: React.FC<{ rating: number, numReviews: number }> = (props) => {
  return (
    <Box d="flex" alignItems="center">
      {Array(5)
        .fill('')
        .map((_, i) => {
          const roundedRating = Math.round(props.rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: '1' }}
                color={i < props.rating ? 'teal.500' : 'gray.300'}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf key={i} style={{ marginLeft: '1' }} />;
          }
          return <BsStar key={i} style={{ marginLeft: '1' }} />;
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {props.numReviews} review{props.numReviews > 1 && 's'}
      </Box>
    </Box>
  );
}

export default Rating;