import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';

import styles from './styles.css';
import { Card } from '../../components';
import CardModel from '../../models/Card';
import AppStore from '../../stores/AppStore';

const cards = [
  new CardModel('1/2'),
  new CardModel('0'),
  new CardModel('1'),
  new CardModel('2'),
  new CardModel('3'),
  new CardModel('5'),
  new CardModel('8'),
  new CardModel('13'),
  new CardModel('20'),
  new CardModel('?'),
];

class CardPicker extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super();
    this.state = {
      pickedCard: null,
    };
  }

  /**
   * @returns boolean
   */
  isSelected(card) {
    return this.state.pickedCard && this.state.pickedCard.value === card.value;
  }

  render() {
    const tmpArray = [styles.cardPicker];

    if (AppStore.game.status.get() !== 'started') return null;

    return (
      <div className={classNames(tmpArray)}>
        <span>Pick your card</span>
        <div className={styles.CardsContainer}>
          {cards.map((card, index) => (
            <Card
              key={index}
              card={card}
              onClick={(pickedCard) => this.setState({ pickedCard })}
              isSelected={this.isSelected(card)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default observer(CardPicker);