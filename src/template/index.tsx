import InternalTemplate from './template';
import InternalCard from './card';
import Field from './field';

type InternalCardT = typeof InternalCard;
type InternalTemplateT = typeof InternalTemplate;
interface CardI extends InternalCardT {
  Field: typeof Field;
}

interface TemplateI extends InternalTemplateT {
  Card: CardI;
}

// 在 `Card` 组件中绑定 `Field`
const Card: CardI = InternalCard as CardI;
Card.Field = Field;

// 在 `Template 组件中绑定 `Card`
const Template: TemplateI = InternalTemplate as TemplateI;
Template.Card = Card;

export default Template;
