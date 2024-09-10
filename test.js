import io from 'socket.io-client';

const socket = io('http://localhost:3000/');

const fixtures_data = {
  competition_id: 0,
  date: '',
  lang: '',
  page: 0,
  round: '',
  team: 0,
};

socket.emit('getFixtures', fixtures_data);

socket.on('fixtures', (data) => {
  console.log('Received fixtures:', data);
});
