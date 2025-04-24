import { useEffect } from 'react';

import { 
  RESIZER_BACKEND_PING_PATH,
  RESIZER_BACKEND_URL,
  RESIZER_IMAGE_SERVER_PING_PATH,
  RESIZER_IMAGE_SERVER_URL
} from '../../config';

export const usePingBackend = () => {
    useEffect(() => {
        const urls = [
          [RESIZER_BACKEND_URL, RESIZER_BACKEND_PING_PATH],
          [RESIZER_IMAGE_SERVER_URL, RESIZER_IMAGE_SERVER_PING_PATH],
        ].map((parts) => parts.join(''));
    
        urls.forEach((url) => fetch(url));
      }, []);
}