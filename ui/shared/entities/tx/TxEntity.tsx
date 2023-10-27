import type { As } from '@chakra-ui/react';
import { chakra } from '@chakra-ui/react';
import _omit from 'lodash/omit';
import React from 'react';

import { route } from 'nextjs-routes';

import transactionIcon from 'icons/transactions_slim.svg';
import * as EntityBase from 'ui/shared/entities/base/components';

type LinkProps = EntityBase.LinkBaseProps & Pick<EntityProps, 'hash'>;

const Link = chakra((props: LinkProps) => {
  const defaultHref = route({ pathname: '/tx/[hash]', query: { hash: props.hash } });

  return (
    <EntityBase.Link
      { ...props }
      href={ props.href ?? defaultHref }
    >
      { props.children }
    </EntityBase.Link>
  );
});

type IconProps = Omit<EntityBase.IconBaseProps, 'asProp'> & {
  asProp?: As;
};

const Icon = (props: IconProps) => {
  return (
    <EntityBase.Icon
      { ...props }
      asProp={ props.asProp ?? transactionIcon }
    />
  );
};

type ContentProps = Omit<EntityBase.ContentBaseProps, 'text'> & Pick<EntityProps, 'hash'>;

const Content = chakra((props: ContentProps) => {
  return (
    <EntityBase.Content
      { ...props }
      text={ props.hash }
    />
  );
});

type CopyProps = Omit<EntityBase.CopyBaseProps, 'text'> & Pick<EntityProps, 'hash'>;

const Copy = (props: CopyProps) => {
  return (
    <EntityBase.Copy
      { ...props }
      text={ props.hash }
      // by default we don't show copy icon, maybe this should be revised
      noCopy={ props.noCopy ?? true }
    />
  );
};

const Container = EntityBase.Container;

export interface EntityProps extends EntityBase.EntityBaseProps {
  hash: string;
}

const TxEntity = (props: EntityProps) => {
  const linkProps = _omit(props, [ 'className' ]);
  const partsProps = _omit(props, [ 'className', 'onClick' ]);

  return (
    <Container className={ props.className }>
      { /* JFIN Mod Start */ }
      <Icon { ...partsProps } color="purple.500"/>
      { /* JFIN Mod End */ }
      <Link { ...linkProps }>
        <Content { ...partsProps }/>
      </Link>
      <Copy { ...partsProps }/>
    </Container>
  );
};

export default React.memo(chakra(TxEntity));

export {
  Container,
  Link,
  Icon,
  Content,
  Copy,
};
