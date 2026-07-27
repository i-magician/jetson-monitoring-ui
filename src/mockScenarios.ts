const IMAGE_FILES = [
    'frame_001.png', 
    'frame_002.jpg', 
    'frame_003.jpg', 
    'frame_004.png', 
    'frame_005.jpg'
]

// Ground-truth label for the image at the same index in IMAGE_FILES.
const ANOMALIES: Array<{ anomalyClass: string | null; confidence: number }> = [
  { anomalyClass: null, confidence: 0.95 },
  { anomalyClass: 'broken stitch', confidence: 0.45},
  { anomalyClass: 'lines', confidence: 0.60 },
  { anomalyClass: null, confidence: 0.08 },
  { anomalyClass: 'pinched fabric', confidence: 0.74 },
];


if(IMAGE_FILES.length !== ANOMALIES.length) {
    throw new Error(
        `mockScenarios: IMAGE_FILES has ${IMAGE_FILES.length} entries but ANOMALIES has ${ANOMALIES.length}. ` +
      'They must be the same length and in matching order — add/remove one entry from each.'
    )
}

export interface MockScenario {
    frameUrl: string; 
    anomalyClass: string | null; 
    confidence: number; 
}

export const MOCK_SCENARIOS: MockScenario[] = IMAGE_FILES.map((file, i) => ({
  frameUrl: `/mockimages/${file}`,
  ...ANOMALIES[i],
}));
