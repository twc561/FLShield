
export type DecompressionSession = {
  id: string;
  title: string;
  script: string;
};

export const decompressionSessions: DecompressionSession[] = [
  {
    id: "session1",
    title: "Post-Call Decompression (Box Breathing)",
    script: `Find a quiet space where you can sit upright for a moment.
Close your eyes if you feel comfortable.
We will now use tactical box breathing to reset.
Step 1: Inhale slowly through your nose for a count of 4.
(1... 2... 3... 4...)
Step 2: Hold your breath for a count of 4.
(1... 2... 3... 4...)
Step 3: Exhale slowly through your mouth for a count of 4.
(1... 2... 3... 4...)
Step 4: Hold at the bottom of the breath for a count of 4.
(1... 2... 3... 4...)
Repeat this cycle 5-10 times. This technique lowers your heart rate and brings you out of a fight-or-flight state. You are in control.`
  },
  {
    id: "session2",
    title: "Pre-Shift Focus",
    script: `Before you begin your shift, take 60 seconds.
Stand or sit with a straight spine.
Close your eyes and take one deep breath in, and let it go.
Set your intention for this shift. Repeat this in your mind:
"My purpose is to protect and serve."
"I am professionally prepared for any challenge."
"I will act with integrity and return home safe."
Visualize a shield of professionalism around you.
Take one more deep breath. Open your eyes. Begin your shift.`
  },
  {
    id: "session3",
    title: "Frustration & Anger Release (5-4-3-2-1 Grounding)",
    script: `When you feel anger or frustration building, pause.
This exercise will bring you back to the present moment.
First, acknowledge the feeling without judgment. It is okay to be frustrated.
Now, let's ground ourselves. Look around you and identify:
5 - Five things you can SEE. (e.g., your steering wheel, a street sign, a cloud)
4 - Four things you can FEEL. (e.g., your duty belt, the chair beneath you, your feet in your boots)
3 - Three things you can HEAR. (e.g., the radio, the car's engine, your own breathing)
2 - Two things you can SMELL. (e.g., the coffee in your car, the air outside)
1 - One thing you can TASTE. (e.g., water, gum)
Take a deep breath. You are grounded and in control of your response.`
  }
];
