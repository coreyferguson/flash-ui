
import client from '../../apolloProvider/apolloClient';
import { GQL_FETCH_CARD } from './useCardFetcher';
import { GQL_SAVE_CARD, cacheUpdater } from './useCardSaver';
import sessionService from '../../authentication/sessionService';

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

export async function autoSizeText(cardId, side, element, hasImage) {
  const maxAllowedWidth = 500;
  const maxAllowedHeight = !hasImage ? 250 : 100;

  let node = element;
  let maxWidth = node.offsetWidth;
  let maxNode = node;
  const stack = [ node ];
  while (stack.length > 0) {
    node = stack.pop();
    if (node.offsetWidth > maxWidth) {
      maxWidth = node.offsetWidth;
      maxNode = node;
    }
    for (let c=0; c<node.children.length; c++) {
      stack.push(node.children[c]);
    }
  }

  const setSize = value => element.setAttribute('style', `font-size: ${value}%`);
  let size=300;
  do {
    setSize(size);
    size -= 5;
  } while (size > 0 && maxNode.offsetWidth > maxAllowedWidth);
  size += 5;

  let textSpan = element.querySelector('span.text');
  do {
    setSize(size);
    size -= 5;
  } while (size > 0 && textSpan && textSpan.offsetHeight > maxAllowedHeight);
  size += 5;
  return saveFontSize(cardId, side, size);
}

export async function saveFontSize(id, side, fontSize) {
  const userId = sessionService.getSignInUserSession().idToken.payload.sub;
  const variables = { id, userId };
  let res = await client.query({ query: GQL_FETCH_CARD, variables });
  const card = res.data.me.card;
  card.userId = userId;
  if (side === 'front') card.sideAFontSize = fontSize;
  if (side === 'back') card.sideBFontSize = fontSize;
  res = await client.mutate({
    mutation: GQL_SAVE_CARD,
    variables: card,
    update(cache, { data: { upsertCard } }) {
      cacheUpdater(cache, upsertCard, false);
    }
  });
}
