import constructorReducer, {
  addIngredient,
  clearConstructor,
  moveIngredient,
  removeIngredient
} from '../constructor-slice';
import { TConstructorIngredient, TIngredient } from '@utils-types';

const bun: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'
};

const main: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png'
};

const sauce: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png'
};

const mainWithId: TConstructorIngredient = {
  ...main,
  id: 'main-id'
};

const sauceWithId: TConstructorIngredient = {
  ...sauce,
  id: 'sauce-id'
};

describe('burgerConstructor reducer', () => {
  test('returns initial state for an unknown action and undefined state', () => {
    expect(constructorReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual({
      bun: null,
      ingredients: []
    });
  });

  test('adds a bun without generated constructor id', () => {
    const state = constructorReducer(undefined, addIngredient(bun));

    expect(state.bun).toEqual(bun);
    expect(state.ingredients).toEqual([]);
  });

  test('replaces selected bun', () => {
    const anotherBun: TIngredient = {
      ...bun,
      _id: 'another-bun-id',
      name: 'Флюоресцентная булка R2-D3'
    };

    const stateWithBun = constructorReducer(undefined, addIngredient(bun));
    const state = constructorReducer(stateWithBun, addIngredient(anotherBun));

    expect(state.bun).toEqual(anotherBun);
    expect(state.ingredients).toEqual([]);
  });

  test('adds a filling ingredient with generated constructor id', () => {
    const action = addIngredient(main);
    const state = constructorReducer(undefined, action);

    expect(action.payload).toEqual(
      expect.objectContaining({
        ...main,
        id: expect.any(String)
      })
    );
    expect(state.ingredients).toEqual([action.payload]);
  });

  test('removes an ingredient by constructor id', () => {
    const state = constructorReducer(
      {
        bun,
        ingredients: [mainWithId, sauceWithId]
      },
      removeIngredient(mainWithId.id)
    );

    expect(state).toEqual({
      bun,
      ingredients: [sauceWithId]
    });
  });

  test('moves an ingredient inside constructor', () => {
    const state = constructorReducer(
      {
        bun,
        ingredients: [mainWithId, sauceWithId]
      },
      moveIngredient({ from: 0, to: 1 })
    );

    expect(state.ingredients).toEqual([sauceWithId, mainWithId]);
  });

  test('clears constructor', () => {
    const state = constructorReducer(
      {
        bun,
        ingredients: [mainWithId, sauceWithId]
      },
      clearConstructor()
    );

    expect(state).toEqual({
      bun: null,
      ingredients: []
    });
  });
});
