import MemoryCard from '../MemoryCard';

describe('MemoryCard', () => {
  it('should render a flipped card correctly', () => {
    const props = {
      uuid: 'some-uuid',
      url: 'image-url.jpg',
      isFlipped: true,
      onClick: jest.fn(),
      success: false,
    };

    const component = MemoryCard(props);

    expect(component).toMatchSnapshot();
  });

  it('should render an unflipped card correctly', () => {
    const props = {
      uuid: 'some-uuid',
      url: 'image-url.jpg',
      isFlipped: false,
      onClick: jest.fn(),
      success: true,
    };

    const component = MemoryCard(props);

    expect(component).toMatchSnapshot();
  });

  it('should invoke onClick function when clicked', () => {
    const onClickMock = jest.fn();
    const props = {
      uuid: 'some-uuid',
      url: 'image-url.jpg',
      isFlipped: false,
      onClick: onClickMock,
      success: true,
    };

    const component = MemoryCard(props);

    component?.props.onClick();

    // Verificar si la función onClick se llamó correctamente
    expect(onClickMock).toHaveBeenCalled();
  });

});
