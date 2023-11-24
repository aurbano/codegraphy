import { Button, Text } from '@chakra-ui/react';
import { FaCircle } from 'react-icons/fa';

const TestIsOnline = true;

function ServerStatus() {
  const isOnline = TestIsOnline;

  return (
    <Button
      size="sm"
      variant="ghost"
      leftIcon={
        <Text color={isOnline ? 'green.400' : 'red.400'}>
          <FaCircle />
        </Text>
      }
    >
      {isOnline ? 'Connected' : 'Offline'}
    </Button>
  );
}

export default ServerStatus;
