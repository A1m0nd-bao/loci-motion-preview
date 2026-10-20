import { defineToolHighlight } from './tool-highlight.js';
import { defineBottomBar } from './bottom-bar.js';
import { defineUserPageToggle } from './user-page-toggle.js';
import { definePlusSelectionToggle } from './plus-selection-toggle.js';
import { defineHomeSettleToggle } from './home-settle-toggle.js';
import { defineWarningNudge } from './warning-nudge.js';
import { defineLiquidRiseToggle } from './liquid-rise-toggle.js';
import { defineChatBubbleToggle } from './chat-bubble-toggle.js';
import { defineTapTab } from './tap-tab.js';
import { definePreviewTabs } from './preview-tabs.js';
import { defineHistoryClock } from './history-clock.js';
import { defineBellRingToggle } from './bell-ring-toggle.js';
import { defineVoiceWave } from './voice-wave.js';
import { definePinToggle } from './pin-toggle.js';
import { definePinReveal } from './pin-reveal.js';
import { defineWrenchTurnToggle } from './wrench-turn-toggle.js';
import { defineProfileRiseToggle } from './profile-rise-toggle.js';
import { defineLayerStackToggle } from './layer-stack-toggle.js';
import { defineWhiteSelectionToggle } from './white-selection-toggle.js';
import { defineSelectionToggle } from './selection-toggle.js';

const definitions = {
  'sipplay-brackets-tool': { define: defineToolHighlight, dependencies: [] },
  'sipplay-image-tool': { define: defineToolHighlight, dependencies: [] },
  'sipplay-bottom-bar': { define: defineBottomBar, dependencies: ["sipplay-home-settle-toggle","sipplay-chat-bubble-toggle","sipplay-plus-selection-toggle","sipplay-user-page-toggle"] },
  'sipplay-user-page-toggle': { define: defineUserPageToggle, dependencies: [] },
  'sipplay-plus-selection-toggle': { define: definePlusSelectionToggle, dependencies: [] },
  'sipplay-home-settle-toggle': { define: defineHomeSettleToggle, dependencies: [] },
  'sipplay-warning-nudge': { define: defineWarningNudge, dependencies: [] },
  'sipplay-liquid-rise-toggle': { define: defineLiquidRiseToggle, dependencies: [] },
  'sipplay-chat-bubble-toggle': { define: defineChatBubbleToggle, dependencies: [] },
  'sipplay-tap-tab': { define: defineTapTab, dependencies: ["sipplay-profile-rise-toggle","sipplay-layer-stack-toggle","sipplay-wrench-turn-toggle"] },
  'sipplay-preview-tabs': { define: definePreviewTabs, dependencies: [] },
  'sipplay-history-clock': { define: defineHistoryClock, dependencies: [] },
  'sipplay-bell-ring-toggle': { define: defineBellRingToggle, dependencies: [] },
  'sipplay-voice-wave': { define: defineVoiceWave, dependencies: [] },
  'sipplay-pin-toggle': { define: definePinToggle, dependencies: [] },
  'sipplay-pin-reveal': { define: definePinReveal, dependencies: [] },
  'sipplay-wrench-turn-toggle': { define: defineWrenchTurnToggle, dependencies: [] },
  'sipplay-profile-rise-toggle': { define: defineProfileRiseToggle, dependencies: [] },
  'sipplay-layer-stack-toggle': { define: defineLayerStackToggle, dependencies: [] },
  'sipplay-white-selection-toggle': { define: defineWhiteSelectionToggle, dependencies: [] },
  'sipplay-selection-toggle': { define: defineSelectionToggle, dependencies: [] }
};

/** Register one audited component and its nested icon dependencies.
 * Browser-only: call after importing Motion, before mounting the element.
 * This is initialization glue; animation behavior remains in the source files.
 */
export function registerMotion(tagName, animate) {
  const entry = definitions[tagName];
  if (!entry) throw new Error('Unknown SipPlay component: ' + tagName);
  if (typeof animate !== 'function') throw new TypeError('Pass animate imported from motion');
  for (const dependency of entry.dependencies) registerMotion(dependency, animate);
  entry.define(animate);
  return customElements.get(tagName);
}
