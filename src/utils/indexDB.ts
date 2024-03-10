export const openIdxDB = async (dbName: string, version: number) => {
  try {
    const db = await window.indexedDB.open(dbName, version);
    return db;
  } catch (error) {
    throw error;
  }
};

export const createDbDocument = async ({
  db,
  doc,
}: {
  db: { dbName: string; version: number };
  doc: { name: string; data: any };
}) => {
  try {
    const request = await openIdxDB(db.dbName, db.version);
    request.addEventListener("upgradeneeded", (ev: IDBVersionChangeEvent) => {
      const db = (ev.target as any).result;
      db.createObjectStore(doc.name, doc.data);
    });
  } catch (error) {
    throw error;
  }
};
