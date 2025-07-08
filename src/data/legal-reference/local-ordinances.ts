
export type OrdinanceTopic = {
  id: string;
  topic: string;
  icon: string;
  summary: string;
  fortPierceDetails: string;
  portStLucieDetails: string;
};

export const localOrdinancesData: OrdinanceTopic[] = [
  {
    id: 'ord1',
    topic: 'Alcohol in Public Places',
    icon: 'Beer',
    summary: 'Regulations concerning the possession and consumption of alcoholic beverages in public areas such as parks, streets, and beaches.',
    fortPierceDetails: 'Generally prohibited in public parks, beaches, and city-owned property without a special event permit. See Fort Pierce City Code, Chapter 6, Article III.',
    portStLucieDetails: 'Consumption of alcohol is prohibited on any public street, sidewalk, or in any public park, except in designated areas with a city permit. See Port St. Lucie City Code, Section 40.06.',
  },
  {
    id: 'ord2',
    topic: 'Noise Ordinances',
    icon: 'Volume2',
    summary: 'Rules defining what constitutes excessive noise and the permissible hours for activities that generate loud sounds.',
    fortPierceDetails: 'Generally, it is unlawful to make any "unreasonably loud, excessive, unnecessary or unusual noise." Specific quiet hours are typically from 10:00 PM to 7:00 AM. See Fort Pierce City Code, Chapter 32, Article IV.',
    portStLucieDetails: 'Prohibits "loud and raucous noise" that is plainly audible from 50 feet away. Construction and similar activities are restricted during evening and overnight hours. Quiet hours are generally 10:00 PM to 7:00 AM. See Port St. Lucie City Code, Section 96.06.',
  },
  {
    id: 'ord3',
    topic: 'Animal Control',
    icon: 'Dog',
    summary: 'Rules regarding pet ownership, including leash laws, licensing, and addressing animals at large.',
    fortPierceDetails: 'All dogs and cats must be licensed and vaccinated. Animals must be on a leash when off the owner\'s property. Specific rules address "dangerous dogs." See Fort Pierce City Code, Chapter 10.',
    portStLucieDetails: 'Requires dogs to be leashed when not on the owner\'s property. Establishes regulations for animal nuisances like excessive barking. Limits the number of dogs/cats per household in most residential zones. See Port St. Lucie City Code, Chapter 90.',
  },
  {
    id: 'ord4',
    topic: 'Parking Regulations',
    icon: 'ParkingCircle',
    summary: 'Ordinances governing where vehicles can and cannot be parked on public streets and property.',
    fortPierceDetails: 'Prohibits parking commercial vehicles in residential areas, parking on sidewalks, and parking against the flow of traffic. Specific time-limited parking in the downtown area. See Fort Pierce City Code, Chapter 70.',
    portStLucieDetails: 'Strict regulations against parking on any part of a residential lawn ("all tires must be off the grass"). Prohibits parking of trailers, RVs, and boats in most driveways for extended periods. See Port St. Lucie City Code, Title VII, Chapter 76.',
  },
];
