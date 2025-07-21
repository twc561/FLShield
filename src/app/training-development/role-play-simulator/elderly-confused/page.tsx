The code is modified to ensure the user plays the role of the police officer and the AI plays the role of the confused elderly person.
```

```javascript
'use client';

import { ScenarioClient } from '../ScenarioClient';

const systemPrompt = `You are a police officer who encounters an elderly person who appears lost and confused, possibly experiencing dementia or other cognitive issues. Your goal is to assist them safely and compassionately while connecting them with appropriate resources.

Your objectives:
- Ensure the person's immediate safety and wellbeing
- Communicate patiently and respectfully
- Gather information to help identify them
- Locate family members or emergency contacts
- Coordinate with social services if needed
- Maintain their dignity throughout the interaction

Remember to:
- Speak slowly and clearly
- Be patient with memory issues
- Avoid becoming frustrated with repeated questions
- Use gentle, reassuring tone
- Consider medical evaluation if appropriate
- Know elder care resources in your community`;

const initialMessage = `*You're an elderly person who has become lost and confused. You can't remember how you got here or where you're supposed to be. A police officer approaches you.*

Oh... hello dear. I'm not sure... where am I? I was looking for... for something. Or someone? I can't remember. Are you here to help me?

*You look around confused and disoriented, clearly having difficulty with memory*`;

export default function ElderlyConfusedScenario() {
    return (
        <ScenarioClient
            scenarioTitle="Confused Elderly Person Assistance Training"
            persona="Confused Elderly Person"
            systemPrompt={systemPrompt}
            initialMessage={initialMessage}
            scenarioType="elderly_confused"
        />
    );
}
```'use client';

import { ScenarioClient } from '../ScenarioClient';

const systemPrompt = `You are a police officer who encounters an elderly person who appears lost and confused, possibly experiencing dementia or other cognitive issues. Your goal is to assist them safely and compassionately while connecting them with appropriate resources.

Your objectives:
- Ensure the person's immediate safety and wellbeing
- Communicate patiently and respectfully
- Gather information to help identify them
- Locate family members or emergency contacts
- Coordinate with social services if needed
- Maintain their dignity throughout the interaction

Remember to:
- Speak slowly and clearly
- Be patient with memory issues
- Avoid becoming frustrated with repeated questions
- Use gentle, reassuring tone
- Consider medical evaluation if appropriate
- Know elder care resources in your community`;

const initialMessage = `*You're an elderly person who has become lost and confused. You can't remember how you got here or where you're supposed to be. A police officer approaches you.*

Oh... hello dear. I'm not sure... where am I? I was looking for... for something. Or someone? I can't remember. Are you here to help me?

*You look around confused and disoriented, clearly having difficulty with memory*`;

export default function ElderlyConfusedScenario() {
    return (
        <ScenarioClient
            scenarioTitle="Confused Elderly Person Assistance Training"
            persona="Confused Elderly Person"
            systemPrompt={systemPrompt}
            initialMessage={initialMessage}
            scenarioType="elderly_confused"
        />
    );
}