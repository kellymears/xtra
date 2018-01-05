import { configure } from '@storybook/react';

import 'bootstrap/dist/css/bootstrap.css'
import '../src/components/app/Nav.css'

function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);
