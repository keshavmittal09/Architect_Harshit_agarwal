import dreamAvenueImg from '@assets/Dream_Avenue_1784381147736.png';
import madhavamImg from '@assets/Madhavam_1784381147737.png';
import facadeStudyImg from '@assets/generated_images/facade_study.png';

export interface Project {
  slug: string;
  name: string;
  location: string;
  year: string;
  typology: string;
  size?: string;
  materials?: string;
  status?: string;
  images: string[];
  conceptNote: string;
}

export const projects: Project[] = [
  {
    slug: 'dream-avenue',
    name: 'Dream Avenue',
    location: 'Bareilly, UP',
    year: '2023',
    typology: 'Residential',
    size: '12,500 sq ft',
    materials: 'Riven sandstone, wrought iron, oiled teak',
    status: 'Completed',
    images: [dreamAvenueImg],
    conceptNote: 'Dream Avenue is conceived as a dialogue between enclosure and openness. The street facade presents a calm, composed face — sandstone planes interrupted only by tall, thin apertures that track the arc of the sun. Within, the plan dissolves into a series of garden courts that pull light deep into the interior. Materials were chosen for their capacity to age: riven sandstone, wrought iron, oiled teak. The project seeks a quality of permanence that new buildings rarely achieve — not through imitation of historical styles, but through an insistence on material honesty and spatial depth.'
  },
  {
    slug: 'madhavam',
    name: 'Madhavam',
    location: 'Lucknow, UP',
    year: '2022',
    typology: 'Residential',
    size: '8,200 sq ft',
    materials: 'Exposed concrete, brass, reclaimed timber',
    status: 'Completed',
    images: [madhavamImg],
    conceptNote: 'Inspired by the lush landscapes associated with spring and the mythology of Lord Krishna, Madhavam is a residence designed to merge seamlessly with its surroundings. The boundaries between interior and exterior are intentionally blurred, utilizing expansive openings and natural materials. Exposed concrete provides a stark, honest backdrop, allowing the warmth of reclaimed timber and the subtle gleam of brass to stand out.'
  },
  {
    slug: 'facade-study-sandstone-i',
    name: 'Facade Study — Sandstone I',
    location: 'Agra, UP',
    year: '2021',
    typology: 'Residential',
    size: 'N/A',
    materials: 'Sandstone, mild steel',
    status: 'Study',
    images: [facadeStudyImg],
    conceptNote: 'This study investigates the structural and aesthetic possibilities of local sandstone. By pushing the material to its thinnest viable profile, the facade becomes a delicate screen rather than a heavy mass. The play of shadows across the textured stone surface transforms the building\'s appearance throughout the day, creating a living, breathing skin for the residence.'
  }
];
