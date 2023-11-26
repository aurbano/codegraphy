import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useBoolean,
} from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { LuTextCursorInput } from 'react-icons/lu';

import type { InputCellModel, InputCellModelType } from '../../../../../api/schema';
import InlineIcon from '../../../../../components/InlineIcon';

interface AddInputProps {
  onAddCell: (cell: InputCellModel) => void;
}

function AddInput({ onAddCell }: AddInputProps) {
  const [isOpen, { on, off }] = useBoolean(false);
  const [label, setLabel] = useState('');
  const [type, setType] = useState<InputCellModelType>();

  const onCreateNewInputCell = () => {
    if (!type) {
      return;
    }

    const inputCell: InputCellModel = {
      id: label, // add a uuid or something here
      label,
      type,
      cell_type: 'input',
      position: {
        // calculate based on the graph
        x: 100,
        y: 100,
      },
      returns: [0],
      value: '',
    };

    onAddCell(inputCell);
    off();
  };

  return (
    <>
      <Button leftIcon={<LuTextCursorInput />} colorScheme="input" onClick={on}>
        Add Input
      </Button>

      <Modal isOpen={isOpen} onClose={off}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <InlineIcon icon={<LuTextCursorInput />} mr={2} />
            Add Input Cell
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" gap={4}>
              <FormControl>
                <FormLabel>Label</FormLabel>
                <Input type="text" value={label} onChange={(e) => setLabel(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Type</FormLabel>
                <Select
                  value={type}
                  onChange={(e) => setType(e.target.value as InputCellModelType)}
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                </Select>
              </FormControl>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={off}>
              Cancel
            </Button>

            <Button colorScheme="primary" onClick={onCreateNewInputCell}>
              Add Cell
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddInput;
