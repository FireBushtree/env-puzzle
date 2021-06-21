import InternalTemplate from './template';
import Card from './card';

type InternalTemplateT = typeof InternalTemplate;
interface TemplateI extends InternalTemplateT {
  Card: typeof Card;
}

const Template: TemplateI = InternalTemplate as TemplateI;
Template.Card = Card;

export default Template;
