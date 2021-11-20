import { RadioGroup } from '@headlessui/react';
import { useState } from 'react';
import { addBrick } from '../api/bricks';
import BrickCard from '../components/Card';
import Button from '../components/Button';
import { Brick } from '../data/brick';
import { useBricks, usePost, useSession } from '../hooks';

const BrickView = () => {
  const {
    bricks, loading, currentStatus, setCurrentStatus,
  } = useBricks();

  const [selected, setSelected] = useState();
  const { session } = useSession();

  const { post } = usePost<{
    brick: Brick;
    uid: string;
  }>(addBrick);

  if (loading) {
    return (
      <div>
        ...
      </div>
    );
  }

  return (
    <>
      <div className={`pt-12 flex gap-4 ${currentStatus === 'ARCHIVED' ? '' : 'justify-end'}`}>
        <Button
          onClick={() => setCurrentStatus((prev) => (prev === 'ARCHIVED' ? 'BRICK' : 'ARCHIVED'))}
          id="ARCHIVED"
        >
          {currentStatus === 'ARCHIVED' ? '←' : 'ARCHIVED' }
        </Button>
        {currentStatus === 'ARCHIVED' && <span className="font-bold text-2xl">ARCHIVED</span>}
      </div>
      <RadioGroup value={selected} onChange={setSelected}>
        <div className="grid gap-4 py-2">
          {bricks.length === 0 && <>👻</>}
          {bricks.map((brick) => (
            <RadioGroup.Option
              key={brick.id}
              value={brick}
            >
              {({ active, checked }) => (
                <>
                  <RadioGroup.Description
                    as={BrickCard}
                    active={active}
                    checked={checked}
                    archive={() => {
                      if (!session) return;
                      post({
                        brick: {
                          ...brick,
                          status: brick.status === 'ARCHIVED' ? 'BRICK' : 'ARCHIVED',
                        },
                        uid: session.user.uid,
                      });
                    }}
                    brick={brick}
                  />
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </>
  );
};

export default BrickView;
