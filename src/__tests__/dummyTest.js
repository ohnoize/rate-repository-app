import React from 'react';
import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';

const Greeting = ({ name }) => {
  return(
  <View>
    <Text testID='greetingText'>Hello {name}!</Text>
  </View>
  );
};

describe('Greeting', () => {
  it('renders a greeting based on name prop', () => {
    const { debug, getByTestId } = render(<Greeting name='Kalle' />);

    debug();

    expect(getByTestId('greetingText')).toHaveTextContent('Hello Kalle!');
  });
});




