function getKeyboardCommand(command: string[]): string {
  return command
    .map((cmd) => {
      if (cmd === 'shift') {
        return '⇧';
      }

      if (cmd === 'alt') {
        return '⌥';
      }

      if (cmd === 'meta') {
        return '⌘';
      }

      if (cmd === 'ctrl') {
        return '⌃';
      }

      return cmd;
    })
    .join(' ');
}

export default getKeyboardCommand;
