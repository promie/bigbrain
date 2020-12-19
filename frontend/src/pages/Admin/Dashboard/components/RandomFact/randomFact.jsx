import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const uselessFactsUrl = 'https://uselessfacts.jsph.pl/random.json?language=en';

const RandomFact = () => {
  const [randomFact, setRandomFact] = useState(null);

  const getFact = () => {
    fetch(uselessFactsUrl)
      .then((response) => response.json())
      .then((response) => { setRandomFact(response.text); })
      .catch(() => { setRandomFact(null); });
  };

  if (!randomFact) getFact();

  const randomFactPane = () => (
    <Box display="flex" flexDirection="column" p={1} m={1} bgcolor="background.paper">
      <Box p={1} bgcolor="grey.300">
        <h1>Stuck for Inspiration?</h1>
        <h3>Maybe create a question from the random fact below</h3>
      </Box>
      <Box aria-label="random fact" p={1} bgcolor="grey.300">
        <h2>{randomFact}</h2>
      </Box>
      <Box p={1} bgcolor="grey.300">
        <Button
          variant="contained"
          color="primary"
          aria-label="Get Next Fact"
          onClick={() => getFact()}
        >
          Get Next Random Fact
        </Button>
      </Box>
    </Box>
  );

  return (
    <section>
      { randomFact && randomFactPane() }
    </section>
  );
};

export default RandomFact;
