import type { Attribute, Schema } from '@strapi/strapi';

export interface ImageComponentImageComponent extends Schema.Component {
  collectionName: 'components_image_component_image_components';
  info: {
    description: '';
    displayName: 'Image Component';
  };
  attributes: {
    description: Attribute.String;
    image: Attribute.Media<'images'> & Attribute.Required;
  };
}

export interface ProductOptionsAttributes extends Schema.Component {
  collectionName: 'components_product_options_attributes';
  info: {
    displayName: 'attributes';
  };
  attributes: {
    default: Attribute.String;
    name: Attribute.String;
    values: Attribute.Text;
    visible: Attribute.Boolean;
  };
}

export interface ProductOptionsOptions extends Schema.Component {
  collectionName: 'components_product_options_options';
  info: {
    description: '';
    displayName: 'options';
  };
  attributes: {
    active: Attribute.Boolean & Attribute.DefaultTo<true>;
    description: Attribute.String;
    name: Attribute.String;
    value: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'image-component.image-component': ImageComponentImageComponent;
      'product-options.attributes': ProductOptionsAttributes;
      'product-options.options': ProductOptionsOptions;
    }
  }
}
