export interface DestinationGroup {
  group: string;
  options: string[];
}

export const FORM_DESTINATION_GROUPS: DestinationGroup[] = [
  {
    group: 'Popular Tour Circuits',
    options: [
      'Golden Triangle (Delhi - Agra - Jaipur)',
      'Delhi & Agra Heritage Tour',
      'Delhi - Agra - Fatehpur Sikri',
      'Delhi - Agra - Mathura - Vrindavan',
      'Rajasthan Royal Circuit (Jaipur, Udaipur, Jodhpur, Jaisalmer)',
      'Himachal Mountain Panorama (Shimla & Manali)',
      'Kashmir Valley & Gulmarg Retreat',
      'Sacred Garhwal & Uttarakhand (Rishikesh & Haridwar)',
      'Char Dham / Do Dham Yatra',
    ],
  },
  {
    group: 'Heritage & Royal Cities',
    options: [
      'Delhi',
      'Agra',
      'Jaipur',
      'Udaipur',
      'Jodhpur',
      'Jaisalmer',
      'Amritsar',
    ],
  },
  {
    group: 'Himalayas & Nature',
    options: [
      'Manali',
      'Shimla',
      'Mussoorie',
      'Nainital',
      'Bhimtal',
      'Jim Corbett',
      'Kashmir',
    ],
  },
  {
    group: 'Spiritual & Pilgrimage',
    options: [
      'Haridwar–Rishikesh',
      'Varanasi',
      'Ayodhya',
      'Badrinath–Kedarnath',
      'Yamunotri',
      'Gangotri',
      'Vaishno Devi',
      'Gaya–Bodhgaya',
    ],
  },
  {
    group: 'Custom Routes',
    options: [
      'Multiple Destinations / Custom Circuit',
      'Other Destination (Specify in Notes)',
    ],
  },
];

export const ADULT_OPTIONS = [
  '1 Adult',
  '2 Adults',
  '3 Adults',
  '4 Adults',
  '5 Adults',
  '6 Adults',
  '7+ Adults (Group)',
];

export const CHILDREN_OPTIONS = [
  '0 Children',
  '1 Child (0-11 yrs)',
  '2 Children (0-11 yrs)',
  '3 Children (0-11 yrs)',
  '4+ Children (Group)',
];

export function getTodayDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
