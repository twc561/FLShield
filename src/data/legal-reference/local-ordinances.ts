
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
    id: 'ord2',
    topic: 'Noise Ordinances',
    icon: 'Volume2',
    summary: 'Rules defining what constitutes excessive noise and the permissible hours for activities that generate loud sounds.',
    fortPierceDetails: 'Prohibits "unreasonably loud, excessive, unnecessary or unusual noise" that disturbs the peace. Quiet hours are generally from 10:00 PM to 7:00 AM. Specific permits required for amplified sound in public areas. Reference: Fort Pierce City Code, Chapter 32, Article IV.',
    portStLucieDetails: 'Prohibits "loud and raucous noise" plainly audible from 50 feet away from a residence, or 100 feet from a business. Construction and similar activities are restricted from 9:00 PM to 7:00 AM. Reference: Port St. Lucie City Code, Section 96.06.',
  },
  {
    id: 'ord1',
    topic: 'Alcohol in Public Places',
    icon: 'Beer',
    summary: 'Regulations concerning the possession and consumption of alcoholic beverages in public areas such as parks, streets, and beaches.',
    fortPierceDetails: 'Prohibits possession of an open container of an alcoholic beverage on any public street, sidewalk, or city-owned property including parks and beaches, unless in a designated area with a special event permit. Reference: Fort Pierce City Code, Chapter 6, Article III.',
    portStLucieDetails: 'Prohibits consumption or possession of an open container of an alcoholic beverage on any public street, sidewalk, alley, or in any public park. Reference: Port St. Lucie City Code, Section 40.06.',
  },
   {
    id: 'ord4',
    topic: 'Parking Regulations',
    icon: 'ParkingCircle',
    summary: 'Ordinances governing where vehicles can and cannot be parked on public streets and property.',
    fortPierceDetails: 'Prohibits parking commercial vehicles in residential areas for more than 2 hours. Prohibits parking on sidewalks, in front of driveways, or against the flow of traffic. Time-limited parking is strictly enforced in the downtown waterfront district. Reference: Fort Pierce City Code, Chapter 70.',
    portStLucieDetails: 'Strictly prohibits parking any vehicle on any part of a residential lawn ("all tires must be off the grass"). Prohibits parking of trailers, RVs, and boats in residential driveways for more than 24 hours unless concealed from view. Reference: Port St. Lucie City Code, Title VII, Chapter 76.',
  },
  {
    id: 'ord3',
    topic: 'Animal Control',
    icon: 'Dog',
    summary: 'Rules regarding pet ownership, including leash laws, licensing, and addressing animals at large.',
    fortPierceDetails: 'All dogs must be on a leash when off the owner\'s property. Animals at large are subject to impoundment. All dogs and cats require city licensing. Reference: Fort Pierce City Code, Chapter 10.',
    portStLucieDetails: 'Requires dogs to be leashed when not on the owner\'s property. Establishes regulations for animal nuisances like excessive barking. Limits the number of dogs/cats per household in most residential zones. Reference: St. Lucie County Animal Control Ordinance (applies in PSL), Chapter 90.',
  },
];
