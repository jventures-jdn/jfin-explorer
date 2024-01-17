import { Box } from '@chakra-ui/react';
import React from 'react';
import type { Primitive } from 'react-hook-form';
import xss from 'xss';

import xssOptions from 'configs/app/xssOptions';
import urlParser from 'lib/token/metadata/urlParser';
import LinkExternal from 'ui/shared/LinkExternal';

import MetadataAccordionItem from './MetadataAccordionItem';
import MetadataAccordionItemTitle from './MetadataAccordionItemTitle';

interface Props {
  name?: string;
  value: Primitive;
  isItem?: boolean;
  isFlat?: boolean;
  level: number;
}

const MetadataItemPrimitive = ({ name, value, isItem = true, isFlat, level }: Props) => {

  const Component = isItem ? MetadataAccordionItem : Box;

  const content = (() => {
    switch (typeof value) {
      case 'string': {
        const url = urlParser(value);
        if (url) {
          return <LinkExternal href={ url.toString() }>{ value }</LinkExternal>;
        }
      }
      // eslint-disable-next-line no-fallthrough
      default: {
        { /* JFIN Mod Start */ }
        return <div dangerouslySetInnerHTML={{ __html: xss(String(value), xssOptions) }}/>;
        { /* JFIN Mod End */ }
      }
    }
  })();

  return (
    <Component level={ level } isFlat={ isFlat }>
      { name && <MetadataAccordionItemTitle name={ name }/> }
      { content }
    </Component>
  );
};

export default React.memo(MetadataItemPrimitive);
